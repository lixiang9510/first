import React,{ Component } from 'react';
import Simditor from 'simditor';
import $ from 'jquery';
import 'simditor/styles/simditor.css';
import './index.css';

class RichEditor extends Component{
	constructor(props){
		super(props);
		this.toolbar = [
			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol',
			'ul',
			'blockquote',
			'code',
			'table',
			'link',
			'image',
			'hr',
			'indent',
			'outdent',
			'alignment',
		];
		$.ajaxSetup({
			xhrFileds:{
				withCredentials:true
			}
		})
	}
	componentDidMound(){
		this.simditor = new Simditor({
			textarea: this.textarea,
			toolbar:this.toolbar,
			upload:{
				url: this.props.url,
				fileKey: 'upload'
			});
		this.simditor.on('valuechange',()=>{
			this.props.getRichEditorValue(this.simditor.getValue())
		})
	}
	render(){
		return(
			<div className="RichEditor"> 
				<textarea ref={(textarea)=>{this.textarea = textarea}}></textarea>
			</div>
		)
	}
}
export default RichEditor;