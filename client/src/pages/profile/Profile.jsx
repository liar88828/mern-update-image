import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
	const {currentUser} = useContext(AuthContext)
	const userId = parseInt(useLocation().pathname.split('/')[2])

	const [openUpdate, setOpenUpdate] = useState(false)


	const {isLoading, error, data} = useQuery(['user'], () => // jangan di kasih kurung kurawal {}
			makeRequest.get('/users/find/' + userId).then((res) => {
				return res.data
			}))


	const {isLoading: relasionLoading, data: relationshipData} = useQuery(['relationship'], () => // jangan di kasih kurung kurawal {}
			makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
				return res.data
			}))

	const queryClient = useQueryClient();
	const mutation = useMutation((following) => {
		// console.log(following)
		if (following) return makeRequest.delete('/relationships?userId=' + userId)
		return makeRequest.post('/relationships', {userId})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["relationship"]);
		}
	})

	const handleFollow = () => {
		mutation.mutate(relationshipData.includes(currentUser.id))
	}

	return (
			<div className="profile">
				{isLoading ? 'loading' : // harus di kasih loading
						<>
							<div className="images">
								<img
										src={'/upload/'+data.cover_pic}
										alt={data.username}
										className="cover"
								/>
								<img
										src={'/upload/'+data.profile_pic}
										alt={data.username}
										className="profilePic"
								/>
							</div>
							<div className="profileContainer">
								<div className="uInfo">
									<div className="left">
										<a href="http://facebook.com"> <FacebookTwoToneIcon fontSize="large"/> </a>
										<a href="http://facebook.com"> <InstagramIcon fontSize="large"/> </a>
										<a href="http://facebook.com"> <TwitterIcon fontSize="large"/> </a>
										<a href="http://facebook.com"> <LinkedInIcon fontSize="large"/> </a>
										<a href="http://facebook.com"> <PinterestIcon fontSize="large"/> </a>
									</div>
									<div className="center">
										<span>{data.name}</span>
										<div className="info">
											<div className="item">
												<PlaceIcon/> <span>{data?.city}</span>
											</div>
											<div className="item">
												<LanguageIcon/> <span>{data?.website}</span>
											</div>
										</div>
										{relasionLoading
												? 'loading'
												: userId === currentUser.id
														? (<button onClick={()=>setOpenUpdate(true)}>update</button>)
														: (<button onClick={handleFollow}>
															{relationshipData.includes(currentUser.id)
																	? 'follonwing'
																	: 'follow'}</button>)}
									</div>
									<div className="right">
										<EmailOutlinedIcon/>
										<MoreVertIcon/>
									</div>
								</div>
								<Posts userId={userId}/>
							</div>
						</>}
				{openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
			</div>
	);
};

export default Profile;
