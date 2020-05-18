// import * as THREE from "three";
import { THREE } from "../@sample/three-another"

const v1: THREE.Vector3 = new THREE.Vector3(1, 2, 3);
const v2: THREE.Vector3 = v1.addScalar(4);

console.log(v1);
console.log(v2);
document.write('v1: ' + v1.toArray() + ', v2: ' + v2.toArray());


class Vector_Another {
    addScalar = (n: number) => n++;
    clone = () => new Vector_Another();
}
const n1 = new Vector_Another();
n1.addScalar(1);

