import React,{ Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

class UploadImage extends Component{
	constructor(props){
		super(props);
		this.state = {
		    previewVisible: false,
		    previewImage: '',
		    fileList: [{
		      uid: '-1',
		      name: 'xxx.png',
		      status: 'done',
		      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		    }],
		};
		this.handlePreview=this.handlePreview.bind(this);
		this.handleChange=this.handleChange.bind(this);

	}
	handleCancel(){
		this.setState({ previewVisible: false })
	}

  	handlePreview(file){
	    this.setState({
	      previewImage: file.url || file.thumbUrl,
	      previewVisible: true,
	    });
	}

  handleChange({ fileList }){
  	 this.setState({ fileList },()=>{
  	 	this.props.getFileList(fileList.map(file=>file.response).join(','))
  	 })
  }

	render(){
		const { previewVisible, previewImage, fileList } = this.state;
		const { action,max } = this.props;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
    );
		return(
			<div className="clearfix">
		        <Upload
		          action={action}
		          listType="picture-card"
		          fileList={fileList}
		          onPreview={this.handlePreview}
		          onChange={this.handleChange}
		          withCredentials={true}
		        >
		          {fileList.length >= max ? null : uploadButton}
		        </Upload>
		        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		          <img alt="example" style={{ width: '100%' }} src={previewImage} />
		        </Modal>
		    </div>
		)
	}
}
export default UploadImage;