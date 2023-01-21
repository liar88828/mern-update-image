import {db} from "../connect.mjs";

export const getComments = (req, res) => {
	const q = `SELECT c.*, u.id as userId, name, profile_pic
             FROM social.comments c
                      JOIN social.users u 
                          ON u.id = c.commentUserId
             WHERE c.postId = ?
             ORDER BY c.createaAt desc `


// 	db.query(q, [req.query.postId], (err, data) => {
// 		if (err) return res.status(500).json(err)
// 		return res.status(200).json(data)
// }

db.query(q, [req.query.postId], (err, data) => {
	if (err) return res.status(500).json(err);
	return res.status(200).json(data);
});
};