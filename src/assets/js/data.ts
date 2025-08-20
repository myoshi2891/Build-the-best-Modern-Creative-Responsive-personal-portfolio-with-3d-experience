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
        image: "/public/people/person1.jpg"
    },
    {
        name: "Sarah Johnson",
        position: "UI/UX Designer",
        review: "Incredible design and user experience. The animations are smooth and the overall aesthetic is very professional.",
        image: "/public/people/person2.jpg"
    },
    {
        name: "Mike Chen",
        position: "Full Stack Developer",
        review: "The technical implementation is impressive. Clean code, great performance, and excellent use of modern web technologies.",
        image: "/public/people/person3.jpg"
    },
    {
        name: "Emily Rodriguez",
        position: "Product Manager",
        review: "This portfolio perfectly showcases technical skills while maintaining great usability. Very impressed with the overall execution.",
        image: "/public/people/person4.jpg"
    },
    {
        name: "David Kim",
        position: "Creative Director",
        review: "Outstanding creative vision combined with solid technical execution. The 3D elements add a unique touch that sets this apart.",
        image: "/public/people/person5.jpg"
    }
];
