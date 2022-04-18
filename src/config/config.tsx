import local from './config-local.json'
import prod from './config-prod.json'

const profile = process.env.react_profiles_active || "local"
export const config:any = profile==="local" ? local : prod

export function get(key: string): string {
    return config[key]
}