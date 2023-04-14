export type RouteType = {
    path: string,
    label: string,
    always?: boolean,
    no_authenticated?: boolean,
    authenticated?: boolean,
    admin?: boolean
}