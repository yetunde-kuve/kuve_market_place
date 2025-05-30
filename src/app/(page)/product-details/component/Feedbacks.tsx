import React from 'react';

export interface Feedback {
    id: string;
    name: string;
    isVerified?: boolean;
    content: string;
    date: string;
}

interface FeedbackComponentProps {
    feedbacks?: Feedback[];
    showLoadMore?: boolean;
    onLoadMore?: () => void;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({feedbacks = defaultFeedbacks, showLoadMore = true, onLoadMore}) => {
    return (
        <div className="md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {feedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
            </div>

            {/* Load More Button */}
            {showLoadMore && (
                <div className="flex justify-center">
                    <button
                        onClick={onLoadMore}
                        className="bg-[#FF9D98] hover:bg-red-400 text-black font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

interface FeedbackCardProps {
    feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header with name and menu */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                    {feedback.isVerified && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8486 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z" fill="#FF9D98"/>
                        </svg>
                    )}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>

            {/* Feedback Content */}
            <p className="text-gray-700 leading-relaxed mb-4">
                {feedback.content}
            </p>

            {/* Date */}
            <p className="text-sm text-gray-500">
                Posted on {feedback.date}
            </p>
        </div>
    );
};

// Default sample data
const defaultFeedbacks: Feedback[] = [
    {
        id: '1',
        name: 'Samantha D.',
        isVerified: true,
        content: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
        date: 'August 14, 2023'
    },
    {
        id: '2',
        name: 'Alex M.',
        isVerified: true,
        content: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
        date: 'August 15, 2023'
    },
    {
        id: '3',
        name: 'Ethan R.',
        isVerified: true,
        content: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
        date: 'August 16, 2023'
    },
    {
        id: '4',
        name: 'Olivia P.',
        isVerified: true,
        content: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
        date: 'August 17, 2023'
    }
];

export default FeedbackComponent;