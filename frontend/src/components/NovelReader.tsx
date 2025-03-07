import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NovelReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchContent();
  }, [id, page]);

  const fetchContent = async () => {
    const response = await fetch(`http://localhost:8000/api/novels/${id}/content?page=${page}`);
    const data = await response.json();
    setContent(data.content);
    setTotalPages(Math.ceil(data.total_length / 1000));
  };

  return (
    <div className="novel-reader">
      <div className="content" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          上一页
        </button>
        <span>{page} / {totalPages}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default NovelReader; 