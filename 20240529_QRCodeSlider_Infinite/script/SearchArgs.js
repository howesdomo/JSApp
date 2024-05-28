class SearchArgs {
    constructor(content, snStartAtIndex, snLength) {
      this.Content = content; // 条码内容
      this.SNStartAtIndex = snStartAtIndex; // 条码中流水号起始位置
      this.SNLength = snLength; // 流水号长度
    }
  }