# open-feeds

Stack - React with MDL, Node, In-Mem DB

Sample Json

Login/Register
{
	_id : String, // Generated
	nick_name : String,
	password : String
}

Feeds
{
	_id : String, // Generated
	nick_name : String,
	feed_content : String,
	timestamp : Date(),
	likes : [],
	comment : []
}

Feed_Comment
{
	nick_name : String,
	timestamp : String,
	comment : String,
}

Feed_Likes
[1,2,3]