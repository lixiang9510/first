/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-19 19:23:56
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	images:'',
	detail:'',
	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	isPageFetching:false,
	list:[],
	current:1,
	pageSize:0,
	total:0,
	
})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total				
		})
	}
	if(action.type == types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type == types.SET_CATEGORY_ID){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
			categoryIdHelp:''
		})
	}
	if(action.type == types.SET_IMAGES){
		return state.set('images',action.payload)
	}
	if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	if(action.type == types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择商品分类'
		})
	}			
	return state;
}