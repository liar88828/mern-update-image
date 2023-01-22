import React, {useState} from 'react';
import './update.scss'
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function Update({setOpenUpdate, user}) {

	const [texts, setTexts] = useState({name: '', city: '', website: ''});
	const [cover, setCover] = useState(null);
	const [profile, setProfile] = useState(null);

	const upload = async (file) => {
		try {
			const formData = new FormData()
			formData.append('file', file)
			const res = await makeRequest.post('/upload', formData)
			return res.data
		} catch (e) {
			console.log(e)
		}
	}

	const queryClient = useQueryClient();
	const mutation = useMutation(
			(user) => {
				return makeRequest.put('/users', user)
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries(["user"]);
				}
			})


	const handleChange = (e) => {
		setTexts(prevState => ({...prevState, [e.target.name]: [e.target.value]}))
	}


	const handleSubmit = async (e) => {
		e.preventDefault()
		let coverUrl = user.cover_pic
		let profileUrl = user.profile_pic
		coverUrl = cover ? await upload(cover) : user.cover_pic
		profileUrl = profile ? await upload(profile) : user.profile_pic


		mutation.mutate({
			...texts,
			cover_pic: coverUrl,
			profile_pic: profileUrl
		})
		setOpenUpdate(false)
	}

	return (
			<div className={'update'}>update
				<form className={'form'}>
					<input type="file" onChange={e => setCover(e.target.files[0])}/>
					<input type="file" onChange={e => setProfile(e.target.files[0])}/>
					<label>name</label>
					<input type="text" onChange={handleChange} name={'name'}/>
					<label>city</label>
					<input type="text" onChange={handleChange} name={'city'}/>
					<label>website</label>
					<input type="text" onChange={handleChange} name={'website'}/>
					<button onClick={handleSubmit}>Update</button>
				</form>
				<button onClick={() => setOpenUpdate(false)}>X</button>
			</div>
	);
}

export default Update;