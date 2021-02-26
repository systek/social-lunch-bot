/* eslint-disable */

export const toJSONOverride = {
  virtuals: true,
  transform: (doc: any, ret: any): any => {
    const { _id, __v, ...rest } = ret
    return rest
  },
}
