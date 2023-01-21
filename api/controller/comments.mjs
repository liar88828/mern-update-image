import {db} from "../connect.mjs";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req, res) => {
	const q = `SELECT c.*, u.id as userId, name, profile_pic
             FROM social.comments c
                      JOIN social.users u
                           ON u.id = c.commentUserId
             WHERE c.postId = ?
             ORDER BY c.createaAt desc `


	db.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}
export const postComments = (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token,
			'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')
				const q = "INSERT INTO social.comments(`descrp`, `createaAt`, `commentUserId`,postId) VALUES (?)";
				const rb = req.body
				const values = [
					rb.descrp,
					moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
					userInfo.id,
					req.body.postId
				]
				db.query(q, [values], (err) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('Comments has been create')
				})
			})

}