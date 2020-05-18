// 出力の確認用に簡易にしたTHREE.Vector3
export namespace THREE {
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

        public clone() {
            return new Vector3(this.x, this.y, this.z);
        }

        public toArray() {
            return [this.x, this.y, this.z];
        }
    }
}
