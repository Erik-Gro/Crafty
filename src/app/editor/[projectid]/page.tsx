import { protectServer } from "@/features/auth/util";
import { Editor } from "@/features/editor/Editor";

const EditorPage = async () => {
  await protectServer();
  return <Editor />;
};

export default EditorPage;
