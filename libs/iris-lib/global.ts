import GUN from 'gun'
import 'gun/sea'
import 'gun/lib/yson'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'

let global: any

export default function (opts: any = {}) {
  if (!global) {
    const myOpts = Object.assign(
      {
        peers: ['https://gundb.alizemani.ir'],
        localStorage: false,
        retry: Infinity,
        axe: true,
      },
      opts
    )
    // if (opts.peers) {
    //   opts.peers.forEach((url: string) => peers.add({ url }))
    // }
    // peers.init()
    global = new GUN(myOpts)
  }
  return global
}
