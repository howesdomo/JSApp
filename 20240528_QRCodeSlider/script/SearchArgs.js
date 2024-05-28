class SearchArgs {
    constructor(content, qty, snStartAtIndex, snLength) {
      this.Content = content; // 条码内容
      this.Qty = qty; // 制作条码数量
      this.SNStartAtIndex = snStartAtIndex; // 条码中流水号起始位置
      this.SNLength = snLength; // 流水号长度
    }
  }