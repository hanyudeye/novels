from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import List

app = FastAPI()

# 允许跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 小说文件目录
NOVEL_DIR = "../novels"

encodings = [
    'utf-8-sig',  # UTF-8 with BOM
    'utf-8',
    'utf-16',
    'utf-16le',
    'utf-16be',
    'gbk',
    'gb2312',
    'gb18030',
    'big5'
]

@app.get("/api/novels")
async def get_novels() -> List[dict]:
    """获取所有小说列表"""
    novels = []
    for filename in os.listdir(NOVEL_DIR):
        if filename.endswith('.txt'):
            novels.append({
                "id": len(novels) + 1,
                "title": filename[:-4],
                "filename": filename
            })
    return novels

@app.get("/api/novels/{novel_id}/content")
async def get_novel_content(novel_id: int, page: int = 1, page_size: int = 1000):
    """获取小说内容，支持分页"""
    novels = await get_novels()
    if novel_id < 1 or novel_id > len(novels):
        raise HTTPException(status_code=404, detail="Novel not found")
    
    filename = novels[novel_id - 1]["filename"]
    filepath = os.path.join(NOVEL_DIR, filename)
    
    for encoding in encodings:
        try:
            with open(filepath, 'r', encoding=encoding) as f:
                content = f.read()
            break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        raise HTTPException(status_code=500, detail="Failed to decode file with supported encodings")
        
        
    # 简单分页
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "content": content[start:end],
        "total_length": len(content),
        "current_page": page
    }
