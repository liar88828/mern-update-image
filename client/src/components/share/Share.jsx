import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const Share = () => {
	const [file, setFile] = useState(null);
	const [descrp, setDesc] = useState(''); //descrp harus sama dengan database
	const {currentUser} = useContext(AuthContext)

	const queryClient = useQueryClient();
	const mutation = useMutation((newPost) => {
		return makeRequest.post('/posts', newPost)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		}
	})

	const upload = async () => {

		try {
			const formData = new FormData()
			formData.append('file', file)
			const res = await makeRequest.post('/upload', formData)
			return res.data
		} catch (e) {
			console.log(e)
		}
	}


	const handleSubmit = async (e) => {
		e.preventDefault()
		let imgUrl = ''
		if (file) imgUrl = await upload()
		mutation.mutate({descrp, img: imgUrl})
		setFile(null)
		setDesc('')
	}

	return (
			<div className="share">
				<div className="container">
					<div className="top">
						<div className="left">

							<img
									src={currentUser.profilePic}
									alt=""
							/>
							<input type="text"
							       value={descrp}
							       placeholder={`What's on your mind ${currentUser.name}?`}
							       onChange={e => setDesc(e.target.value)}/>


						</div>
						<div className="right">
							{file && <img className={'file'} alt={'image'} src={URL.createObjectURL(file)}/>}
						</div>
					</div>
					<hr/>
					<div className="bottom">
						<div className="left">
							<input type="file"
							       id="file" style={{display: "none"}}
							       onChange={e => setFile(e.target.files[0])}/>
							<label htmlFor="file">
								<div className="item">
									<img src={Image} alt="image"/>
									<span>Add Image</span>
								</div>
							</label>
							<div className="item">
								<img src={Map} alt="image"/>
								<span>Add Place</span>
							</div>
							<div className="item">
								<img src={Friend} alt="image"/>
								<span>Tag Friends</span>
							</div>
						</div>
						<div className="right">
							<button onClick={handleSubmit}>Share</button>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Share;
