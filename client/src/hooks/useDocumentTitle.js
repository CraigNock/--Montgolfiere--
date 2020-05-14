import React from 'react';

const useDocumentTitle = (title, fallbackTitle) => {
  React.useEffect(() => {
    document.title = title;
    return () => {
      document.title = fallbackTitle;
    };
  // eslint-disable-next-line
  }, [title]);
};

export default useDocumentTitle;