


// import mongoose from "mongoose"

// /**
//  * User Schema
//  * - Includes name, email, password
//  * - Bookmarks: reference to Post documents
//  * - Timestamps: createdAt and updatedAt
//  */

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 100,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     bookmarks: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post",
//       },
//     ],
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// )

// // Prevent model overwrite during development (hot reload)
// const User = mongoose.models.User || mongoose.model("User", UserSchema)

// export default User













import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String, // ✅ Add this
      default: '',
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User
