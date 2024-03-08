// ReviewContainer.tsx
import React from 'react';
import MyVpnCardDedicated from './MyvpncardDedicated';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
  onChildValue: (value: string) => void;
}

const VpnContainerDedicated: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false, onChildValue }) => {

  const handleReviewDeleted = () => {
    window.location.reload();
  };

  const renderNoReviewsFound = () => (
    <div
      className="w-full text-center py-10"
      
    >
      <h2 className="text-4xl font-semibold text-gray-300">No Dedicated VPNs</h2>
    </div>
  );

  return (
    <>
      <div
        className="container mx-auto"
        style={{ backgroundColor: '#192424'}}
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            
          >
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="flex">
                <MyVpnCardDedicated
                  metaData={metaData}
                  MyReviews={MyReviews}
                  onReviewDeleted={handleReviewDeleted}
                  onChildValue={onChildValue}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VpnContainerDedicated;