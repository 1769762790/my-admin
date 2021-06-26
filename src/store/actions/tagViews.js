import * as types from '../action-types'

export const addTag = (tag) => {
    return {
        type: types.TAGSVIEW_ADD_TAG,
        tag
    }
}
export const delTag = (tag) => {
    return {
        type: types.TAGSVIEW_DEL_TAG,
        tag
    }
}
export const closeOther = (tag) => {
    return {
        type: types.TAGSVIEW_CLOSE_OTHER_TAGS,
        tag
    }
}
export const closeAll = () => {
    return {
        type: types.TAGSVIEW_CLOSE_ALL
    }
}
