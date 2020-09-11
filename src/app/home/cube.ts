export class Cube {
  private _min = 1;
  private _max = 6;

  public next() {
    const rawValue = Math.random();
    const scaledAndOffsetValue = this._min + Math.floor(rawValue * this._max);
    //console.log('Cube::next(): raw:', rawValue, 'scaledAndOffset:', scaledAndOffsetValue);
    return scaledAndOffsetValue;
  }
}
