const DicBasePath=window.RestBasePath?window.RestBasePath:'/management-system';

export default {
  DicBasePath,
  /**************=== 应聘人员信息 ====******************/
  interviewee: {
    //查询所有
    getall_interviewee: DicBasePath + "/interviewee/getall_interviewee",
  },
}
