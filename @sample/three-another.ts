// 出力の確認用に簡易にしたTHREE.Vector3
export class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x?: number, y?: number, z?: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public addScalar(n: number) {
        this.x += n;
        this.y += n;
        this.z += n;
        return this;
    }

    public addScalarInClass(n: number) {
        return this.addScalar(n);
    }

    public add(v: Vector3) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    public sub(v: Vector3) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    public normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        if (length !== 0) {
            this.x /= length;
            this.y /= length;
            this.z /= length;
        }
        return this;
    }

    public clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    public toArray() {
        return [this.x, this.y, this.z];
    }
}
