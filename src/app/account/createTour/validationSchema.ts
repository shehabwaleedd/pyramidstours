import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    mainImg: Yup.object().shape({
        url: Yup.string().required('Main image URL is required'),
        public_id: Yup.string().required('Main image public ID is required'),
    }),
    images: Yup.array().of(
        Yup.object().shape({
            url: Yup.string().required('Image URL is required'),
            public_id: Yup.string().required('Image public ID is required'),
        })
    ),
    options: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
        })
    ),
    isRepeated: Yup.boolean(),
    repeatTime: Yup.array().of(Yup.number()),
    repeatDays: Yup.array().of(
        Yup.string().oneOf([
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ])
    ),
    dateDetails: Yup.string().required('Date details are required'),
    location: Yup.object().shape({
        from: Yup.string().required('Starting location is required'),
        to: Yup.string().required('Destination is required'),
    }),
    inclusions: Yup.array().of(Yup.string()),
    exclusions: Yup.array().of(Yup.string()),
    adultPricing: Yup.array().of(
        Yup.object().shape({
            adults: Yup.number(),
            pricePerPerson: Yup.number().required('Price per adult is required'),
        })
    ),
    childrenPricing: Yup.array().of(
        Yup.object().shape({
            children: Yup.number(),
            pricePerPerson: Yup.number().required('Price per child is required'),
        })
    ),
    duration: Yup.string(),
    subtitle: Yup.string(),
});


export default validationSchema