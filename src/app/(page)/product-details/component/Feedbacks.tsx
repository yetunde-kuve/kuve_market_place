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
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1388 0.932569C12.9665 0.657382 12.7128 0.442738 12.4129 0.318514C12.1129 0.194289 11.7817 0.166666 11.4654 0.23949L9.22005 0.755241C8.98994 0.808129 8.75084 0.808129 8.52073 0.755241L6.2754 0.23949C5.95904 0.166666 5.62784 0.194289 5.32792 0.318514C5.02799 0.442738 4.77425 0.657382 4.60202 0.932569L3.37821 2.88568C3.25333 3.08548 3.08474 3.25407 2.88494 3.3802L0.93183 4.60401C0.657118 4.77609 0.442788 5.02941 0.318591 5.32883C0.194393 5.62824 0.166489 5.9589 0.238751 6.27489L0.754501 8.52272C0.807198 8.75243 0.807198 8.99108 0.754501 9.22079L0.238751 11.4674C0.166208 11.7835 0.193972 12.1145 0.318183 12.4141C0.442394 12.7138 0.656881 12.9673 0.93183 13.1395L2.88494 14.3633C3.08474 14.4882 3.25333 14.6568 3.37946 14.8566L4.60327 16.8097C4.95543 17.3729 5.62728 17.6514 6.2754 17.5028L8.52073 16.987C8.75084 16.9341 8.98994 16.9341 9.22005 16.987L11.4666 17.5028C11.7828 17.5753 12.1137 17.5476 12.4134 17.4233C12.7131 17.2991 12.9666 17.0846 13.1388 16.8097L14.3626 14.8566C14.4875 14.6568 14.656 14.4882 14.8558 14.3633L16.8102 13.1395C17.0852 12.9671 17.2996 12.7133 17.4235 12.4134C17.5475 12.1135 17.575 11.7824 17.502 11.4661L16.9875 9.22079C16.9346 8.99068 16.9346 8.75158 16.9875 8.52147L17.5033 6.27489C17.5759 5.95885 17.5484 5.62801 17.4244 5.32835C17.3004 5.02869 17.0862 4.77509 16.8114 4.60276L14.8571 3.37895C14.6576 3.25384 14.4889 3.08521 14.3638 2.88568L13.1388 0.932569ZM12.5106 6.08633C12.5879 5.9443 12.607 5.77785 12.564 5.62199C12.521 5.46614 12.4192 5.33304 12.2801 5.25069C12.141 5.16834 11.9753 5.14318 11.818 5.18048C11.6607 5.21778 11.524 5.31464 11.4367 5.45069L8.17107 10.9778L6.19923 9.08967C6.14073 9.0296 6.07073 8.98194 5.99342 8.94951C5.9161 8.91708 5.83304 8.90056 5.7492 8.90092C5.66535 8.90129 5.58244 8.91853 5.50541 8.95164C5.42838 8.98474 5.3588 9.03301 5.30083 9.09359C5.24285 9.15416 5.19768 9.22579 5.16798 9.3042C5.13829 9.38261 5.1247 9.4662 5.12801 9.54997C5.13132 9.63375 5.15147 9.71601 5.18726 9.79183C5.22305 9.86765 5.27374 9.93549 5.33631 9.9913L7.87635 12.4252C7.94434 12.4902 8.02613 12.539 8.11562 12.568C8.2051 12.5969 8.29998 12.6053 8.39316 12.5924C8.48634 12.5796 8.57541 12.5459 8.65372 12.4938C8.73203 12.4417 8.79756 12.3725 8.84541 12.2916L12.5106 6.08633Z" fill="#FF9D98"/>
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