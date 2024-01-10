import { getFingerprint } from "thumbmarkjs";
import  { setItem, getItem } from "./storage";

export interface storageOptionsInterface {
    storageUrl: string,
    namespace: string
}

const options: storageOptionsInterface = {
    storageUrl: 'https://storage-test.thumbmarkjs.com/v1/fingerprint',
    namespace: 'thumbmarkjs'
}

export { getFingerprint, setItem, getItem, options }