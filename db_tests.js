import { connect_mongo_db } from "./src/database/database.js";
import { NoteModel, UserModel } from "./src/database/models/user.js";

let mail = 'kaarelen@gmail.com'

async function go() {
    await connect_mongo_db()
    await UserModel.deleteMany({
        email: /^kaarelen@gmail.com1{0,1000}$/
    })



    const note3 = new NoteModel({
        title: 'title text3',
        text_content: 'a u homeless? just buy a house3',
        size: 'smalls'
    })

    const user = await new UserModel({
        email: mail,
        password_hash: 'orbital1024',
    })
    await user.validate()
    await user.save()

    await UserModel.updateOne(
        { email: mail },
        { $push: { notes: note3 } },
        { runValidators: true },
    )
    await me.updateOne(undefined, { '$push': { notes: note1 } })

    // console.log(me.notes)
    // console.log(await UserModel.findOne({ email: mail }))

}


Promise.resolve(go())
    .then(() =>
        process.exit(1)
    )