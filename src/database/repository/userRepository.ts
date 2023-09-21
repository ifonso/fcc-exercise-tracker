import { IExercise } from "../models/Exercise";
import { IUser } from "../models/User";
import { User } from "../mongo";

class UserRepository {
    async createUser(username: string): Promise<IUser> {
        const newUser = await User.create({ username });
        return {
            _id: newUser._id.toString(),
            username: newUser.username,
            exercises: newUser.exercises,
        };
    }

    async createExercise(userID: string, exercise: IExercise): Promise<IUser> {
        const user = await User.findById(userID);

        if (!user) throw new Error("user does not exist");

        user.exercises.push(exercise);
        await user.save();

        return {
            _id: user._id.toString(),
            username: user.username,
            exercises: user.exercises,
        };
    }

    async findUser(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async getUsers(): Promise<IUser[]> {
        return (await User.find()).map((document) => {
            return {
                _id: document._id.toString(),
                username: document.username,
                exercises: document.exercises,
            };
        });
    }
}

export { UserRepository };
