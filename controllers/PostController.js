import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      postUrl: req.body.postUrl,
      tags: req.body.tags,
      user: req.userId
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'wrong post'
    })
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't fetch posts"
    })
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: { viewsCount: 1 }
    }, {
      returnDocument: 'after'
    },
    (err, doc) => {
      if (err) {
        console.log(error);
        return res.status(400).json({
          message: 'cant find post'
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: 'cant find post'
        })
      }
      res.json(doc);
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't get post"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: 'cant delete that shit'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'no post, cant delete'
        })
      }

      res.json({
        success: true
      })
    }
    )
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "fuck u"
    })
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    
    await PostModel.updateOne({
      _id: postId
    }, {
      title: req.body.title,
      text: req.body.text,
    });

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'cant update post'
    })
  }
};