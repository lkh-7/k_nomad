#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Error: 워크트리 이름을 입력해주세요!"
    return 1
fi

# 첫번째 아규먼트를 워크트리 이름으로 받기: ../로 현재폴더 바깥에 만듬(한페이지 동시작업목적)
ARGUMENT=$1
WORKTREE_PATH="../worktree/$ARGUMENT"

# [수정 포인트] 폴더가 이미 존재하는지 체크 (-d 옵션)
# if [ -d "$WORKTREE_PATH" ]; then
#     echo "정보: '$ARGUMENT' 워크트리가 이미 존재합니다. 해당 위치로 이동합니다."
#     cd "$WORKTREE_PATH" || return 1
#     echo "디렉토리 변경완료 $(pwd)"
#     claude
#     return 0
# fi

#워크트리 생성하고 성공하면 현재위치 변경
if git worktree add "$WORKTREE_PATH"; then
    echo "워크트리 생성 성공: $WORKTREE_PATH"
    cd "$WORKTREE_PATH" || return 1
    echo "디렉토리 변경완료 $(pwd)"
    claude
else
    echo "워크트리 생성에 실패했습니다."
    return 1
fi 