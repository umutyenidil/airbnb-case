import PropTypes from "prop-types";

const ShimmerContainer = ({className = 'w-full h-full aspect-square '}) => {
    return (
        <div className={className + "relative rounded-lg overflow-hidden bg-gray-200"}>
            <div
                className="absolute top-0 left-0"
                style={{
                    background: 'linear-gradient(90deg, #000000, #000000, #000000)',
                    backgroundSize: '300% 100%',
                    animation: 'shimmer 2s infinite linear',
                }}>

            </div>
        </div>
    );
};

ShimmerContainer.propTypes = {
    className: PropTypes.string,
};

export default ShimmerContainer;