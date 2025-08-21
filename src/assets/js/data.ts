export interface Review {
    name: string;
    position: string;
    review: string;
    image: string;
}

export const reviews: Review[] = [
    {
        name: "John Doe",
        position: "Frontend Developer",
        review: "Amazing work! The attention to detail and creativity in this portfolio is outstanding. The 3D elements really make it stand out.",
        image: "/public/people/craig.jpg"
    },
    {
        name: "Sarah Johnson",
        position: "UI/UX Designer",
        review: "Incredible design and user experience. The animations are smooth and the overall aesthetic is very professional.",
        image: "/public/people/jake.jpg"
    },
    {
        name: "Mike Chen",
        position: "Full Stack Developer",
        review: "The technical implementation is impressive. Clean code, great performance, and excellent use of modern web technologies.",
        image: "/public/people/matheus.jpg"
    },
    {
        name: "Emily Rodriguez",
        position: "Product Manager",
        review: "This portfolio perfectly showcases technical skills while maintaining great usability. Very impressed with the overall execution.",
        image: "/public/people/sergio.jpg"
    },
];
