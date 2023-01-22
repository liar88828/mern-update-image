import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import {makeRequest} from "../../axios";
import Post from "../post/Post";

const Posts = ({userId}) => {
	// console.log(userId)

	const {isLoading, error, data} =
			useQuery(['posts'], () => // jangan di kasih kurung kurawal {}
					makeRequest.get('/posts?userId=' + userId)
							.then(res => {
								return res.data
							}))
	console.log(userId)

	return <div className="posts">
		{(error
				? "Somting that wrong"
				: (isLoading
						? 'loading'
						: data.map((post) => {
							return (<Post post={post} key={post.id}/>)
						})))}
	</div>;
};

export default Posts;
