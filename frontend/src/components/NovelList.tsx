import React, { useEffect, useState } from 'react';

interface Novel {
  id: number;
  title: string;
  filename: string;
}

const NovelList: React.FC = () => {
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/novels')
      .then(res => res.json())
      .then(data => setNovels(data));
  }, []);

  return (
    <div className="novel-list">
      <h2>小说列表</h2>
      <div className="grid">
        {novels.map(novel => (
          <div key={novel.id} className="novel-card">
            <h3>{novel.title}</h3>
            <a href={`/read/${novel.id}`}>开始阅读</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovelList; 