import {db} from "../connect.mjs";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getLikes = async (req, res) => {
	const q = `SELECT likeUserId
             FROM social.like_post
             WHERE likePostId = ?`
	db.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data
				.map(like => like.likeUserId) // harus sama dengan query
		)
	})
}

export const postLikes = async (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token,
			'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')
				const q = "INSERT INTO social.like_post (likeUserId, likePostId) VALUES (?)";
				const rb = req.body
				const values = [
					userInfo.id,
					rb.likePostId
				]
				db.query(q, [values], (err) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('post has been like')
				})
			})


}
export const deleteLikes = async (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token,
			'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')
				const q = "DELETE FROM social.like_post WHERE likeUserId=? AND likePostId= ?";
				const rb = req.body
				const values = [
					userInfo.id,
						rb.likePostId
				]
				db.query(q, [values], (err) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('post has been dilike')
				})
			})


}