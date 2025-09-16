declare module "*.module.css"
declare module "*.svg" {
  const type: string
  export default type
}
