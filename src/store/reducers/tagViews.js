import * as types from '../action-types'
import Utils from '@/lib'

const initTags = {
  tagList: [],
  isShowTagView: true
};

export default (state = initTags, action) => {
    switch (action.type) {
        case types.TAGSVIEW_ADD_TAG:
            const tag = action.tag
            // if (state.tagList.includes(tag)) {
            //     return state
            // }
            return {
                ...state,
                tagList: Utils.uniqueArr([...state.tagList, ...tag])
            }
        case types.TAGSVIEW_DEL_TAG:
            return {
                ...state,
                tagList: [...state.tagList.filter(item => item !== action.tag)]
            }
        case types.TAGSVIEW_CLOSE_OTHER_TAGS: 
            return {
                ...state,
                tagList: [...state.tagList.filter(item => item.path === '/dashboard' || item === action.tag)]
            }
        case types.TAGSVIEW_CLOSE_ALL: 
            return {
                ...state,
                tagList: [...state.tagList.filter(item => item.path === '/dashboard')]
            }
        default: 
            return state
    }
}