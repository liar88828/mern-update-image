import {useContext, useState} from "react";
import "./comments.scss";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import moment from 'moment'

const Comments = ({postId}) => {
	const {currentUser} = useContext(AuthContext);
	const [descrp, setDescrp] = useState('');
	//Temporary
	const {isLoading, error, data} = useQuery(['comments'], () => // jangan di kasih kurung kurawal {}
			makeRequest.get('/comments?postId=' + postId).then(res => {
				return res.data
			}))


	const queryClient = useQueryClient();
	const mutation = useMutation((newComments) => {
		return makeRequest.post('/comments', newComments)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["comments"]);
		}
	})


	const handleSubmit = async (e) => {
		e.preventDefault()
		mutation.mutate({descrp, postId})
		setDescrp('')
	}
	console.log(data)

	return (
			<div className="comments">
				<div className="write">
					<img src={currentUser.profilePic} alt=""/>
					<input type="text" placeholder="write a comment"
					       value={descrp}
					       onChange={e => setDescrp(e.target.value)}
					/>
					<button onClick={handleSubmit}>Send</button>
				</div>
				{isLoading ?
						'loading' :
						data.map((comment) => (
								<div className="comment" key={comment.id}>
									<img src={comment.profile_pic} alt=""/>
									<div className="info">
										<span>{comment.name}</span>
										<p>{comment.descrp}</p>
									</div>
									<span className="date">
								{moment(comment.createaAt).fromNow()}
							</span>
								</div>
						))}
			</div>
	);
};

export default Comments;
