import type { CommandModule } from "yargs"
import { gqlClient } from "../../gql/index.js"
import { writeFileSync } from "fs"
import env, { CWD_PATH } from "../../constants.js"
import { Qu_GetLibraries } from "@fxhash/gql"
import path from "path"
import {
  isEjectedProject,
  validateProjectStructure,
} from "../../validate/index.js"
import { yesno } from "../../utils/prompts.js"
import { getProjectPaths } from "../../templates/paths.js"
import { formatAndWriteHtml, readAndParseHtml } from "../../utils/parseHtml.js"
import { logger } from "../../utils/logger.js"

export const commandAdd: CommandModule = {
  command: "add [module]",
  describe: "Add an existing library to the project",
  builder: yargs =>
    yargs
      .option("srcPath", {
        type: "string",
        default: env.SRC_PATH,
        describe: "The path to the src of the project",
      })
      .option("l", {
        alias: "list",
        type: "boolean",
        default: false,
        describe: "List all existing libraries and their version",
      })
      .option("inject", {
        type: "boolean",
        default: false,
        describe: "Inject the snippet into the html file",
      }),
  handler: async yargs => {
    try {
      const inject = yargs.inject as boolean
      const srcPathArg = yargs.srcPath as string
      const module = yargs.module as string
      const list = yargs.list as boolean
      const isEjected = isEjectedProject(srcPathArg)
      const srcPath = isEjected ? srcPathArg : ""
      const { data } = await gqlClient.query(Qu_GetLibraries, {})
      await validateProjectStructure(srcPath)
      const { htmlEntryPath } = getProjectPaths(srcPath)

      console.log("list?", data)

      if (!list && !module) {
        console.log(
          "Pleas specifiy a library you want to add or use --list to see the available libraries"
        )
        return
      }

      const withoutEmpty = data?.offchain?.Library.filter(lib => {
        console.log(lib)
        return lib.versions.length > 0
      })

      if (list) {
        withoutEmpty?.forEach(library => {
          if (library.versions.length === 0) return
          console.log(`├─ ${library.name}`)
          library.versions.forEach(version => {
            console.log(`  ├─ ${library.name}@${version.id}`)
          })
        })
        return
      }

      if (module) {
        const [name, version] = module.split("@")
        const library = withoutEmpty?.find(
          lib => lib.name === name || lib.id === name
        )
        if (!library) {
          logger.errorExit(`Could not find library ${name}`)
        }
        // TODO: Savely extract the latest version
        const libraryVersion =
          library?.versions.find(v => v.id === version) || library?.versions[0]

        // if the versions dont match we couldn't find the specified version
        if (
          !libraryVersion ||
          (version && version !== "" && version !== libraryVersion?.id)
        ) {
          logger.errorExit(
            `Could not find library ${name} with version ${version}`
          )
          return
        }
        writeFileSync(
          path.join(CWD_PATH, srcPath, libraryVersion.filename),
          libraryVersion.content
        )
        logger.success(
          `${name}@${libraryVersion.id} download successfull. ☜(⌒▽⌒)☞`
        )
        const scriptTag = `<script src="./${libraryVersion.filename}"></script>`
        const askForInjection = !inject
        let doInject = inject
        if (askForInjection)
          doInject = await yesno({
            title: `Shall we inject the script tag into your html entry file?`,
            description: `${scriptTag} -> ${htmlEntryPath}`,
            hideIndex: true,
          })
        if (doInject) {
          try {
            const htmlRoot = await readAndParseHtml(htmlEntryPath)
            const head = htmlRoot.querySelector("head")
            const scriptExists = htmlRoot.querySelector(
              `script[src="./${libraryVersion.filename}"]`
            )
            if (scriptExists) {
              logger.log(
                `Script tag with src ./${libraryVersion.filename} already exists. No need to inject.`
              )
              return
            }
            head?.insertAdjacentHTML("beforeend", scriptTag)
            await formatAndWriteHtml(htmlRoot, htmlEntryPath)
            logger.success(
              "We have injected the script into your html entry file successfully."
            )
          } catch (error: unknown) {
            logger.error("Error injecting fxhash-snippet into")
            logger.errorExit((error as Error).message)
          }
        }
      }
    } catch (e: unknown) {
      logger.errorExit((e as Error).message)
    }
  },
}
