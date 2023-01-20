import {db} from "../connect.mjs";
import jwt from "jsonwebtoken";

export const getPost = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token, 'secretkey', (err, userInfo) => {
		if (err) return res.status(403).json('token is not valid')
		const q = `SELECT p.*, name, profile_pic
               FROM post p
                        JOIN users u ON u.id = p.userId
                        LEFT JOIN relationships r ON u.id = r.followedUserId
               WHERE r.followUserId = ?
                  OR p.userId = ?
               ORDER BY createAt desc `; // AND r.followUserId =?// hanya untuk only saja
		db.query(q, [userInfo.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json(data)
		})
	})
}