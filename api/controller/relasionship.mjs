import {db} from "../connect.mjs";
import jwt from "jsonwebtoken";

export const getRelasionShip = async (req, res) => {

	const q = `SELECT followUserId
             FROM social.relationships
             WHERE followedUserId = ?`

	db.query(q, [req.query.followedUserId], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data
				.map(relasion => relasion.followUserId) // harus sama dengan query
		)
	})
}

export const postRelasionShip = (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token,
			'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')

				const q = `INSERT INTO social.relationships (followUserId, followedUserId)
                   VALUES (?)`;

				db.query(q, [[userInfo.id, req.body.userId]], (err, data) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('Following')


				})
				console.log(userInfo.id, req.body.userId)
			})

}

export const deleteRelasionShip = async (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token,
			'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')
				const q = `DELETE
                   FROM social.relationships
                   WHERE followUserId = ?
                     AND followedUserId = ?`;
				db.query(q, [userInfo.id, req.query.userId], (err) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('unFollow  has been dilike')
				})
			})


}