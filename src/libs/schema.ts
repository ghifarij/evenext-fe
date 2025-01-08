import * as Yup from "yup";

export const ticketSchema = Yup.object({
  category: Yup.string().required("Pilih kategori tiket"),
  price: Yup.number()
    .required("Harga dibutuhkan")
    .min(0, "Harga lebih besar dari 0"),
  seats: Yup.number()
    .required("Jumlah tiket dibutuhkan")
    .min(10, "Tiket minimum 10"),
});

export const eventSchema = Yup.object({
  thumbnail: Yup.mixed<File>()
    .required("Thumbnail is required")
    .test(
      "fileSize",
      "File terlalu besar (maksimal 2MB)",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Format file tidak didukung (hanya .jpeg, .png, .jpg, .webp)",
      (value) =>
        !value ||
        (value instanceof File &&
          ["/image/jpeg", "image/png", "/image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 100 characters long")
    .required("Title is required"),
  date: Yup.date()
    .typeError("Invalid date format")
    .required("Event date is required"),
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format (must be HH:mm, 24-hour format)"
    )
    .required("Event time is required"),
  location: Yup.string().required(
    "Select location between Bandung, Jakarta, Surabaya, Bali"
  ),
  venue: Yup.string().required("Venue address is required"),
  category: Yup.string().required(
    "Select category between Konser, Seminar, Olahraga, Expo"
  ),
  description: Yup.string().required("Description is requried"),
  terms: Yup.string().required("Terms is required"),
});

export const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
});

export const LoginSchema = Yup.object().shape({
  data: Yup.string().required("Email or Username is required!"),
  password: Yup.string()
    .min(3, "Password is too weak!")
    .required("Password is required!"),
});

export const ResetPaswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(3, "Password is too weak!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password not match!")
    .required("Confirm password is required!"),
});

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "You have to set rating for this event")
    .required("You have to set the rate first"),
  description: Yup.string().required(
    "Give your honest review about this event"
  ),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string()
    .min(3, "Password is too weak!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not match!")
    .required("Confirm password is required!"),
});
