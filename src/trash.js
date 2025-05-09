// Refactor Genders Codes

// const [genders, setGenders] = useState([]);
// const [genderStates, setGenderStates] = useState([]);

// Get Genders And States

// const reFetchData = async () => {
//     try {
//         const [statesResult, gendersResult] = await Promise.all([
//             api.get("/Types/States"),
//             // api.get("/Gender/Genders"),
//         ]);
//         // setGenderStates(statesResult.data);
//         // setGenders(gendersResult.data.response);
//     } catch (error) {
//         console.error("خطا در دریافت اطلاعات", error);
//     }
// };

// useEffect(() => {
//     reFetchData();
// }, [addGenderIsSucceeded]);

// Refactor Avatars Codes

// const [avatars, setAvatars] = useState([]);
// const [avatarTypes, setAvatarTypes] = useState([]);
// const [avatarStates, setAvatarStates] = useState([]);
// Refetch Data

// const reFetchData = async () => {
//     try {
//         const [typesResult, avatarsResult, statesResult] =
//             await Promise.all([
//                 api.get("/Types/TypeAvatar"),
//                 api.get("/Avatar/Avatars"),
//                 api.get("/Types/States"),
//             ]);
//         setAvatarTypes(typesResult.data);
//         setAvatars(avatarsResult.data.response);
//         setAvatarStates(statesResult.data);
//         console.log('States :', statesResult.data)
//     } catch (error) {
//         console.error("خطا در دریافت اطلاعات", error);
//     }
// };
// useEffect(() => {
//     reFetchData();
// }, [addAvatarIsSucceeded]);
