import * as THREE from "three";
// import * as THREE from "../@sample/three-another"

const v1: THREE.Vector3 = new THREE.Vector3(1, 2, 3);
const v2: THREE.Vector3 = v1.addScalar(4);

console.log(v1);
console.log(v2);
document.write('v1: ' + v1.toArray() + ', v2: ' + v2.toArray());

const fn_addScalar = (v: THREE.Vector3) => v.addScalar(1);

class Class_Vector {
    public fn_class = (v: THREE.Vector3) => v.addScalar(1);
    public fn_class2 = (v: THREE.Vector3) => {
        const v3 = new THREE.Vector3(3, 3, 3);
        return v.add(v3);
    }
}

class Vector_Another {
    addScalar = (n: number) => n++;
    clone = () => new Vector_Another();
}
const n1 = new Vector_Another();
n1.addScalar(1);

