import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    await knex("folders").del();

    await knex("folders").insert([
        // John Doe
        { id: 1, name: "Finance", path: "home", user_id: "1" },
        { id: 2, name: "Investments", path: "home-Finance", user_id: "1" },
        { id: 3, name: "Stocks", path: "home-Finance-Investments", user_id: "1" },
        { id: 4, name: "Mutual Founds", path: "home-Finance-Investments", user_id: "1" },
        { id: 5, name: "Retirement", path: "home-Finance", user_id: "1" },
        { id: 6, name: "Insurance", path: "home-Finance", user_id: "1" },
        { id: 7, name: "Gym", path: "home", user_id: "1" },
        { id: 8, name: "Work", path: "home", user_id: "1" },
        { id: 9, name: "Project 1", path: "home-Work", user_id: "1" },
        { id: 10, name: "Project 2", path: "home-Work", user_id: "1" },
        { id: 11, name: "Project 3", path: "home-Work", user_id: "1" },
        { id: 12, name: "Docs", path: "home", user_id: "1" },
        { id: 13, name: "Home", path: "home", user_id: "1" },
        { id: 14, name: "Vacation", path: "home-Home", user_id: "1" },
        { id: 15, name: "Rome", path: "home-Home-Vacation", user_id: "1" },
        { id: 16, name: "USA", path: "home-Home-Vacation", user_id: "1" },
        { id: 17, name: "New Zealand", path: "home-Home-Vacation", user_id: "1" },
        { id: 18, name: "Scotland", path: "home-Home-Vacation", user_id: "1" },
        { id: 19, name: "Purchases", path: "home-Home", user_id: "1" },

        // Jane Doe
        { id: 20, name: "Work", path: "home", user_id: "2" },
        { id: 21, name: "Project 1", path: "home-Work", user_id: "2" },
        { id: 22, name: "Project 2", path: "home-Work", user_id: "2" },
        { id: 23, name: "Project 3", path: "home-Work", user_id: "2" },
        { id: 24, name: "Home", path: "home", user_id: "2" },
        { id: 25, name: "Children", path: "home-Home", user_id: "2" },
        { id: 26, name: "School", path: "home-Home-Children", user_id: "2" },
        { id: 27, name: "Medical Care", path: "home-Home-Children", user_id: "2" },
        { id: 28, name: "Photos", path: "home", user_id: "2" },

        // Emily Smith
        { id: 29, name: "School", path: "home", user_id: "3" },
        { id: 30, name: "Pre School", path: "home-School", user_id: "3" },
        { id: 31, name: "Elementary", path: "home-School", user_id: "3" },
        { id: 32, name: "Junior High", path: "home-School", user_id: "3" },
        { id: 33, name: "High School", path: "home-School", user_id: "3" },
        { id: 34, name: "Collage", path: "home-School", user_id: "3" },
        { id: 35, name: "Shows", path: "home", user_id: "3" },
        { id: 36, name: "Movies", path: "home", user_id: "3" },
        { id: 37, name: "Musics", path: "home", user_id: "3" },

        // Michael Johnson
        { id: 38, name: "Personal Finance", path: "home", user_id: "4" },
        { id: 39, name: "Savings", path: "home-Personal Finance", user_id: "4" },
        { id: 40, name: "Expenses", path: "home-Personal Finance", user_id: "4" },
        { id: 41, name: "Investments", path: "home-Personal Finance", user_id: "4" },
        { id: 42, name: "Stocks", path: "home-Personal Finance-Investments", user_id: "4" },
        { id: 43, name: "Real Estate", path: "home-Personal Finance-Investments", user_id: "4" },
        { id: 44, name: "Insurance", path: "home-Personal Finance", user_id: "4" },
        { id: 45, name: "Health", path: "home-Personal Finance-Insurance", user_id: "4" },
        { id: 46, name: "Auto", path: "home-Personal Finance-Insurance", user_id: "4" },
        { id: 47, name: "Hobbies", path: "home", user_id: "4" },
        { id: 48, name: "Photography", path: "home-Hobbies", user_id: "4" },
        { id: 49, name: "Photos", path: "home-Hobbies-Photography", user_id: "4" },
        { id: 50, name: "Gardening", path: "home-Hobbies", user_id: "4" },
        { id: 51, name: "Plants", path: "home-Hobbies-Gardening", user_id: "4" },
        { id: 52, name: "Work", path: "home", user_id: "4" },
        { id: 53, name: "Projetcs", path: "home-Work", user_id: "4" },
        { id: 54, name: "Projetc 1", path: "home-Work-Projetcs", user_id: "4" },
        { id: 55, name: "Projetc 2", path: "home-Work-Projetcs", user_id: "4" },
        { id: 56, name: "Projetc 3", path: "home-Work-Projetcs", user_id: "4" },
        { id: 57, name: "Meetings", path: "home-Work", user_id: "4" },

        // Samantha Davis
        { id: 58, name: "Personal Development", path: "home", user_id: "5" },
        { id: 59, name: "Courses", path: "home-Personal Development", user_id: "5" },
        { id: 60, name: "Course 1", path: "home-Personal Development-Courses", user_id: "5" },
        { id: 61, name: "Materials", path: "home-Personal Development-Courses-Course 1", user_id: "5" },
        { id: 62, name: "Assignments", path: "home-Personal Development-Courses-Course 1", user_id: "5" },
        { id: 63, name: "Books", path: "home-Personal Development", user_id: "5" },
        { id: 64, name: "Fitness", path: "home", user_id: "5" },
        { id: 65, name: "Workout Plans", path: "home-Fitness", user_id: "5" },
        { id: 66, name: "Nutrition", path: "home-Fitness", user_id: "5" },
        { id: 67, name: "Recipies", path: "home-Fitness-Nutrition", user_id: "5" },
        { id: 68, name: "Travel", path: "home", user_id: "5" },
        { id: 69, name: "Past Trips", path: "home-Travel", user_id: "5" },
        { id: 70, name: "Trip1", path: "home-Travel-Past Trips", user_id: "5" },
        { id: 71, name: "Trip2", path: "home-Travel-Past Trips", user_id: "5" },
        { id: 72, name: "Future Plans", path: "home-Travel", user_id: "5" },
        { id: 73, name: "Blogs", path: "home", user_id: "5" },
        { id: 74, name: "Drafts", path: "home-Blogs", user_id: "5" },
        { id: 75, name: "Images", path: "home-Blogs", user_id: "5" },
        { id: 76, name: "Finance", path: "home", user_id: "5" },
        { id: 77, name: "Bank Statement", path: "home-Finances", user_id: "5" },

    ]);
}
