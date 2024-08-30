/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  InputUploadMeasureUseCase,
  UploadMeasureUseCaseContractDomain,
} from '@/domain/contracts/measure/upload-measure-usecase-contract-domain';
import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { SharpImagesConverter } from '@/infra/conversor/images/sharp-images-converter';
import { MeasureUploadValidator } from '@/infra/validators';
import type { Either } from '@/shared/either';
import { right } from '@/shared/either';
import path from 'path';
import { MeasureUploadController } from '../measure-upload-controller';

const absolutePath = (relativePath: string) => {
  const currentDirectory = __dirname;
  return path.join(currentDirectory, relativePath);
};

const data = {
  image:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAJQAlAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7+KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIsp6H/P40E8ke34v/ADDKeh/z+NAcke34v/MloKCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgDH+2w/wDPX9aend/cv8zxvr8O7+7/AO1G/bIv7sP/AH0tF12X4/5i+vx/q/8A8ga3mx/31/Oke0SUAFABQAUAFABQAUAFABQAUAFABQBB68/QetU5ySu3p6L/ACMvYLTzvb5fMjc43KeCMf0NKMpzT00+X/A7FOpRw+7/AAnp+Ev5j4Q/aR/bn+AP7L9hB/wsbxVu8R6hk6X4D8O2323xdq3pt0cLgjHfIIwOTkkfTZNwXxHm3JPH3eH195/VLSVp2cXTxcJyjeFOzjeN9E7KZ+P8d+JnDHAdNrM5f2pV0tFLMMCtJYS93QwOMV+XGU3Z/wDPvo5vl/GDU/8AgqH+2x+019stf2NfgbfWPhYXf9l/8JXb2f8AwnG1hhN3/CwtbHhv4DaK5wR/wj5Pifrg1+uZTwbwRlCU85xUpztdUvY5l7GMlKbU4fVq1aaklUg1etJLnlpf4PwZeJPijx7VlHw3wv8AZsU7a1eH8VLZ80Ws/wADgmrSwePTXKtZ/wB2jz4N18Ev+Cp3xQxd+Lf2mJ/Ds1x10PTfjH488K/ZP/DMaFx/4U2eldFPiDwwV0uD0r7JZ/xAu/ageticr8Wa0Wv9bL3/AOpFw13j/wBPF2KR/ZF/4KLaPeC80X9sXxFe6lbAn7Nrf7QX7RZBz/2G9B/sA+/4eldi4l8MNYvg68bdc/z/AJX3VvYt/erHy+I4P8XKzb/1t7W/4QeGe0V/0ErsSD47f8FYP2bnOp6753xh8H2NoRdfadK0r4i2B7H/AJJln4u6N3PIPXnOTn3Y8K+HHFNKpToV/qtaonapSo5zzxl7z54qdWjSc4qg5LnhON370ZaqXj4rjbxQ4GqKpn+H/tOn1vW4fwfSK/5gsLi5fFi6O3/PvtKXL9y/s4f8Fnfg78RXsvDnxt0if4LeIJ8g+JGuv7d+Gl4MdT4rHy6NgY48RbMj+LPFfl3EvgjnmB14ZnLFQWvPJYKnUkrUOayxmZ2unKvFL2a0V0pNwT/UeD/pAZZnEeTHU/7Mn1SliMa9XiXvTyanFXjSjq+azqbe7K/7M6Pr+l+JdPh1LSru31PTbi1Nxb6lbXP26xvPTqBwdvBGeB6CvwrH1c6yHFRwmbUJU4yc0+aWGv7kIVG+WhGrK3NWp2fMlJNSi3Fu39I5fj8j4ij9cymvzyjt+7xkVq50n/vMKCWlGp9j8XFy6Fj8s+V7Lnn/AGgR+R9K2zOLwGH+t4NWmt1fvOnT3q860U5/Z/Rr3KX/AArJ4XFKyha2u/Nep/y79nt7KP2n+afQ12HQFABQAUAFABQAUAFABQBkGXHJTBHT5vz6D+dVye1mkut9Pl3uuxwYrG+xpXX9e9FdYPufhf8A8FIP+CkDfAC6tPgT8B9LuPHH7Qfi+7sPDWhaL4c0/wD4Si90fUNVXbpOlaVpGQNZ+J4AyPDpJ/4Rfwyf+Et8Xr/wiQU1+kcO8O08VD2lRpQ3u5Nf9BCle1aCUIqHM22+snyqN3+A8Xcd1sFWlGLWkbu6ppWjDCy3lhJe83PlS0cpOMIc0pKJ8m/swf8ABMXV/Hetj4z/ALbl4Pi38R/EVyNc1X4Xtr2p+KfhL4OzpmFHxA1UjP7QGuE7R2+A3hXlfB/hPHhw+KK9fG8UZ5gqSVdOMGouCawsGl7jSlCOGcote0j7sknF6OKadt+BPDLJOHKjlnFs2bTUrrFYPb627xeFx1fl/i0byjranJc3LVqJft54W+FWnWFnb2o0eCBbe1Nra2v/AC4WXUEf2Uf+JDoxP/1ga/Pcfj8LnU39ZqWlpf3Kj6Qt/DhSW1KO353v+8zwuCqUorh/D/2ba+vta2M+1fbGyXasv+4n92B6RD4d09MQTSwAwdCLsHpz3/yc+1dlTG1VHXM3r/1BQ7r+6eLDLMAmr5V31+vVvP8A6eC3Om6RJgGfZ/49/j0/z054p5lVjZf2nbv/ALFHy/6dnZHCZctHlPp/t9f5/aOa1DwdoN/k5gF5x/pX2Tr/AIY7evX0rwoYl4qqp5HX5Xr/AMur/Za/5i4x/lq9P/bTf6jg8mouP1b+0r7/AL6rg9pX/nq/8/f/ACn/AHtPz8/ac/YF+GfxqtbzWL7Qf7E8bHP2b4keG7XS7Hxb6AaqOnxNAA6eIhj9TX7Rwf4ncT8Jw5cU3Vi23ZvAx1/fpcnJgcSqcUq0bwilFyvOylKo3/PfHnhdwbxtV58yh/ZMn/ezTHbRwi/5h8wwl/8Adaf/AIMt9h835Z/Df41/tP8A/BMf4mWnw/8AFMp8e/A/Wrj7TpWirj/hFfF2njP9r+J/hPq/zD4Za2G1fP8Awr1gUJyCGGfFB/YM2ybIvHrLamdZRhlQrclKMm54idRJ4iNCNOcsRVymL9m8rxHKuWcIyqTcH7ynW/m/BZ1n30fs9o5Rm1b2sJuq+VwwkYvlwcsS3bDUs4av/bNJXVSMrLfeNL+oP4Q/GDwL8bvh14U+J/w+12HXPCPi7TP7U0vUxjGGxg6qCR/Y2tDJ44PBwM4J/kjMMtnkGPnlWOs3Dk0i9IuVGGI+KnKo2v30G7z9LO6j/e2UZ6uIsio5tg/dlP2uur+HGVcNtVo0VdqhJL91ZN69JP6FrzT7IKACgAoAKACgAoAKACgD80P+Chv7Xekfskfs+eKfiAt7Zw+MtZF7oHg0aixaxs9SOnFtU8S6qvIOi+HdEJ19scnAGDwF+n4F4KXEnEUc/wCXlwmGftpST5eV/VsTg6cfexFFzhOWEkqn7puMYtOMVUVV/lfiBxkuEeEfrtKLqZtm81GnSjFuVWWEzPBYayawuJpc3sMTFxh7KF7pLnquXL+XP/BML9i3xHLeXf7Wfxy0abVf2hvjBa6hqug23iQBdQ+Cfww1cDWP7KyPmPxQ+NBH/CQftBjOB/xIfCYAPhxs/T8acX0sRnscFC0adCKjGMU1GMXgsLUiox+qwUUuW1k322SR5fh9wdUyHhT601/wpZo+blagpOWEzDF0pJ1Fiq9GUVQqXinyJatR9rOdv2tk8e/BP4c6R5viP4nfDLQ4ftItf9J8d+BNDHOe/wDbmM+w56ZABFfmJ+0HnGoftffBn/U6X8YPgR9j7fafjx4D/L/kO/T2oAwP+GoPhjL/AKr48fs5wQ8f8e3xa8B//L3+Xr+FAFSP9qD4Y/8ARcv2c+On/F2vAf5/8h3/AOtQBuW/7WHwh/1Mvxj/AGeh/wBe3x68Bf01319v/r1yS7fiv8zj+reX9f8AgRr2f7Tn7ON//rfjh8D4Of8Al5+M3gP9B/bg/lRyS7fiv8w+reX9f+BHiPxv+HHwI/ac8A67oemeLfBPxE8OXN3/AMfHw58U6T4q/wCEP8YZx/wlH9r6EWGi62evXuc4OQP1HhbOI5Pm8eJ3ePs5P3nB8s1LDV8B7toVW7Kryt/V9JJvlt7x+M8SeHseN8kq5tjWvrOLVPlS5nf2GLoYZ608ZgoK0MJF60o32Tk7zn+Uv7A3xo8X/sO/td6n+yV8YNQhPw4+MPijT/C9trW5lsLL4nauCPhJ470or97Q/jUp0rwAAcgeKx4ePUeJmH6B4s0nxxlVLiSimpq7atHmSWJy/BqEr/Vubl+rSajGk1zKybUnKf474Q8Q4nJM+qeEeaL2eHxLg6c04T1oYPMuJ5e7h6NWdvaVaSalmUU9HaSi8PH+r2KUTDAb68H6jr/n9K/mmnh3h3fp2+9fzS/mP7FnioYpWg7L0fl3jH+UllXK8du34iuuE09Vrb1XddUdmF/dLVfP5y7X7lyucsKACgCtcTeVAZeeAOlAHxP/AMPH/wDgn/F9rz+25+yUPI6/8ZB/C75fr/xPz9Pl3Dr2oA7X4VftafsvfGnxLN4I+Df7SHwJ+Kni+20u/wBduPDfw4+LXgPxxrtpp2k6kNGOptpXgzXmf+xgc5J2g5AwxGSAfUk/b8P60Afye/tt+MLL9rr/AIKV+Dfg3rq3+qfCH9nvb4q8UaHagLY+JW+HQ0TV9W8MvlcsfEfxs1T4T+HQPlI8LaL48ycLtP77w7i6PBnAtarSSjVxEqVScrSvNrNKlNOzjioqSpV4R1W0bWvrD+S8dQn4k+I1KNRyeVZbGpGEFKKUHi8kpybcl9SxM4vEYGbtFv3pKXNGlFxq/ur8HdO1nWhpuo67hQLk6pcwW2CLvUSOuOMgNz17c1/P+Mwk6+Gq563dz5NLJfDUjg/5ktVH/nyv/bj+psLiIYnMqeeU/dy3LlUSWr5XjMNPBp3ajiJf7Sua3sp9vch7x8beKPiXD4o8B6l/xPoD8N7f4c6fqmg3P/CUCx/4mH/CefDfWP8AoO/9lC6/8yto2gVZ3G94g8UaPdfFjw2L/wAVf8Sy3+LXxAPg3+2/GR/0z/jHP4kf8xfRdd/5An9uf5/6FcA4Tw/4y16XxD8VNSsNe0P/AIWdcfs+/D/S/C//AAknjL7D/wA1R/ao/wCJpq39i69/yG/7DOlY8PUAdh4X8UadFealDFrH/Et1j4ofHDVPGVzbeMtLvrCz/wCJX/xKNL/5Dv8AwkH9t/252/5Fb/iTa8P+hXoA8+t/G2g3XwX8Bw3Xin7Do9vpf/BP/wDsH7Tr5/5CH/CefB/+1+uu/wD6q7uSPb8X/me59W8v6/8AAj0O88TwzeOPDc3iPXPCulalb3Xxw/4Rf+xPiR/wlX/Ev/4QP4b/ANkf8xz/AJDf9uf2r/LpxRyR7fi/8w+reX9f+BHRfDbxJPqHjLxJNFqf/EzufB3wf/t7/ie/8JV/xMB/wsntj+wMfz9M10U6s8VL+wVuuuml08Z2je/L/wA/v/kT5jO6UqknHBe7hMFbmWjv9ZVJrWs1U/iKb05/+3Y2Py8/4Kc/DKLxr4KtPFXlT6X4q8AXX9gnW9EA48H6v/yCNU5z/wATvw5rn/FQDH5c1+48E4z26/1WqXkm772s/wDasw0SirL3FosQle73bg/5l8TMhoV4vxLyyPs8VgfilecrfWngMgWmIrKm/wB2qi0wE99eVqNY/dj9gH483f7T/wCyT8Afjjr/APZkHirxx4DsP+E6tdOwbG08f6Tu8IfEXSwRgEL440jVgM8jAHP3j+KZ3h40HKCT91Ravtabg9NXZLWK8or1P2ThXFyxc021tslbaOITv7sdXyp/PpsfUXijxVoXgPw1rHjLxbruieF/DXh/Sv7d13WfEV0NE0/R7BcnVtT1bVui4I4J2jO0E52ivncNPmeu/wCfxeR9/i/3MLq1tb2d76x9bWufOX/Dyf8A4J8f9Hu/slf+JBfDH/5oa2KPSPhP+0l8AP2gbnXv+FEfGr4TfGH/AIRf7D/wk4+F/jzwx45/4RwasP8AiUnVv7D11v7HJGlEhW+YkE7RtJoA+laAOe8R3YsNE1ifvBpd/c/oT+YyaAP8uT4k/se/tIS/EP4kQ6N8H/GM+m/8Jl4w/sC5+1aZ/wAg8f2R/ZGf+J7/ANVC0n/wc/jQB9F/sO/Br9ov4EfHq9+Jt94P8Y/DKz0fwvqBtfH9tdaXYfY9Q/4Tv/iUf8gWscV8Ufn+USMM7Rk35fnI/rt+Ev7bvxq8f/DXwfHqsPhyw1jUP9F1Pxdp2l/6frGn/wBqf2OdU/snP9g6LrJI+6crkLxwDX0mS0oTUHNc1m2k3orOq7aWvFtJuLvFtao+Oz6uotpfr2o+Ts1d2a11ep+U/wCwVYf8LG/aF/aS+KmqYn1H4keMvB32n/py/tfx58YfiRq//p20ke39jfl93xfFRqRjFKMYrlikrJJQwqSSWyS0SPyfwy/hx+f/AKVjz+gP+1NSsJR9g1K40n/Sj/x7XVfFYn+A/wCvtxP6Ay3+Ivn/AOkzPF7j4N/DGLj/AIV78OfJ/wCfb/hV/wAL/wCf9hGvk62ibe2n6HYH/Cpfhl/0T74cf+Gl+GH/AMoq8arViml69/LyAp/8Kl+G+fO/4V78MftfX7T/AMKl+F//AMovXjFR9e/vf+S//aAH/Cpfhjn/AJJ78Of9I6/8Wl+F/t6aF70fXv73/kv/ANoBc/4VL8MfLEP/AAr34c/Y/wDskvwu/wBD7/8AQCxn/PNOFZa/itdd/IBI/hL8N/tEP/Fvfhz/AKP/ANUl+F3r1/5AP+f59kKqslbXXr6+QHYeHPA/hXwxPPL4c0jStD+04+122iaD4D8K/a+e/wDYuheGee36969On/Afy/8AS2ddBXyG39f76z5y/aq8EReKNDuNGA58YeF/F+gls46f8gc46e30r77gL+NL5f8ApOMPxjxZyZ4vhVNbv9Myy3/p7H+U/Pv/AIJF/tH/ABO8EfB/4zeENE1Gx/4Rv4fftU/ECz0vw3qX+m2N3p3xF8BfB/474BXnRP8AiefFfxXyMcgHjFVx/wD8lp9//qqwZHAOKf8AxC7ANu7X1laq+i4hxiS1jtZLTyM3/go/+0D8cf2j/Dvxa+EunwXx0X/hDvEGheGPhf4TuwDrOo/2WP8Aiaat/bIB1rWx/a2rDgdAB0r5fNKapZpGCbavJ3la+uHpOyUVGKjFWjGMYpRikktD9ChjP3+B0/6Cf/SH/dZ/MHH+yD+0tFpdnqUvwZ8Vf6PanU/+PrS/+gXo+sf9B3/qE6t/nivLPdP61P8Ag2x+EvxE+EOgftTaZ8RfB+qeDtd8Q+KfB4t/tR0zN5pvw7XWvB+Vx1P9vf8ACVA56Lk5yBQB/U7QByniz/kWPEn/AGLGvf8ApsoA/mt0f4D6b4j1Tw34q/4TAwf2vr/g/wC1f8SH/qff2cP+o7zn/hXv4UAeSfFD4a6P8PvhHqXiqXxh/wAwDwf9qGt2v2H/AJhn7N+evt8QtW/CscV8Ufn+USE7Qv8A1uWP2cvjr8N9U8J+ENGj8VwaVewXWoaXaXXiT/QbC8x48Ocj/Hp2r6jIvhj/ANvfnWPzPiSvyzfy07aUPIxP+CWX7rUvGUMv/H5/wmWm/av+wh/wgWsaP/7iPf8AnX3HGH8ZfP8A9Jwp8F4Zfw4/P/0rHn7gSdB9q9/6Y6d+n4V8Tif4D/r7cT+gMt/iL5/+kzMvWNQhsLMTX83kQdP8/TH+e/yWMfKrbLr98fnudh5hqPxBB40vTuB9641sfiP1/wA9K+MxlZ3fyutNNI+QHkHxA+NOj/DnQ/8AhKviN8QtK8HaP9q+y2tzc3X2H7ZqH/QL0nSf+Y1ref8AmX66vYy/q3+YHm3gP9r74b+MtQ1KHQfGHivQ7y38Uf8ACG3Vz4/8B+PPA9heeMP+JP8A8Sv+1vidoX9gf25/xNtJ/wCJAf8AkahrOe1HsZf1b/MD6ftviRHpSXcviX7PpWmQD/SdbuboWP2P141nv+g/OuSFXfX1dtt/IDnvB/x41LxlZ+G/GGg/CXx//wAIfcaD4w1TXv8AhJP+EE8K+LbPUNIz/wAwnWvix4axnGrf8jH/AMIx/wAgau2FZ3/Jaa6PyA9p8MeJNN8ZeG9P1zTWn/s3WLUY+02mqWN/Z/8AUL1bSdZ/4n+i65/zL/8AYHiMkeFRn1xX1lP+A/l/6Wzqm/YZAlt38/8AbV69zzb425mtPDRX/l3utR1QHOc/8SvB4OPU/wAq++4C/jS+X/pOMPzPxBxqfCvl3/7qWC/uH4A/8E4vHPgjw74L/au13W/FWk6VZaj+1V9l0G2+1f6feDR/2X/2V/8AmEjt09utVx//AMlov6/5lWCPB4Bw3/GrsDp/0E/+tFjP7x60nxA8H/Ef9oPV9O0DWbiBza6j/otza5vx/ZHwv/5Cn9kdSM/l9OK+bzn/AJGy+f8A6jUj9Dp4S9bAv/sJ/wDSH/ePrPxB+zdpv/FSaPYeMJx/yOGg2v2nQR/0C/2qNH/6DnX/AIlOk9favHPdP0q/YB8F2fg/x/8AFnTrXWBqtotq12tybX7EM6x461rxd/7mMHn8aAP1foAydXtPt2n6hb/8/Fq1v+ZOf5+lAH8O0ukf8FVIdU1IWP8AwTD+Jgh/4SjULq1uTd/8w8eO/iRrOk5/4n3YHwkevAwemKAOm+GP7Jn/AAUa/aw8WeH/AINfEL9kbVf2Zvh6bb+0/FHxi8f3X+gWmgaT/wAK30caUNJ/t0nW9bxpJJ0DHyjRSxIUE0GE4ab+r7arzP3psv8Agjv+zTofwv8AD/hDwjrvxG0Pxr4YGf8AhZDa8db1DxH4g/6Cmr6RrQOg7vbw6PDHTkjoXb/K/S/z/ryOOcHfbXrr6W6n5QfsuaNL8Ev24P2lf2cPEZ8iTX9U1A+F7j01D4SaprHxI+HPPc+JPhX8QfiFnnt2Fft/FmF/tzIsBn9KLbpLENxbSa9ri8Ng0m3Omr2pPalJee03/HnC2f8A+rfirieDq2ixXsbdf4HDmIzR/DRrveuv+YqPz/hr9brnxRrAkWCaC3gm5zz15/Svy7iCXNnmB4qW2H+tXf8A19wdHLl57/8AUPL5fGf1dh8sXB+DxeTt64v2HKrP/lxVlinr7TFLbFX1qx+fwx4jVzNqf2wzS/aMfh7f5/XFfP41c0dNu/zgfYHPOfK+fsevtjp9QfpxXxeLotyb+77o+YH4O/8ABSzxtqeheJfjV4w1XX/h/qp+EHw5Ol/Bv4Xa1df8Ir8Wv+FwaP4D0f4wf8LQ/Z71bRP+El/4uj4d1zVdJz/xY3xP/wAk0/5G3wv4P/4Smvp8HLZvW3435gPyH/Y8/bk+L/x3+Mtp4c+LXjH9nrVNIuYL/wDaB0rxFrrap4I+E/ws+N2sDSfhxo5+IH9iqB8Tta8Nbdv7P3wgPijwv/xVWuJjxWPGHhnwwR21p6dLd9fLp6i/rb/g/cf1fXUGteKP2Y9O/wCEt0f/AIW14kt7Xwfqmu2/hLQh4WHjD/hXXjzR9Y1j+yR/bviUaN/wkmhaTq3/ADM3/MZr5L2Tk0mu/X/gnTVnySv9/wByXZ9yp4r8OfHL4jftB/so/Fr4Z/E74cz/ALK/w+PxA8efFqC2177df+MdQ/4QT4kaRpOqaTqv/Ma0Qf2tj8df9KPqcpdb29Fv/wBvH6Bw7xFHCRinLv0fev8A9OJfzH0p8HPGWp6hrfxY17SdBnh0fX/GVhqug+Ltb17/AISn/hPP7I0z+xtX1TSNWOu/8gT+3NJ1Yf8AggxX186/9n4d0e9rfKam+k/5+/8AwPg8Xy4/I/qv2l69cXGp/cW0P5v8nnftQ/EL/hX3wJ+JXxZ16WC3vbbwbf6XoIuT9isLP+2Dnv0OPw6V954bZPPF4h1prTTt/Jjo9Ksf5V0Pw7xTzGMOF/7LhrNdNVvmGX4jrBrZv/l5+Punxl/wSS/4JUaD8Wv2WfhN+0T8Ztc8S6Xpn7QFx4t/aCtfAXhzTB4VvT4S+LupnV/h4NV1bIb/AJJaPChx4dVQAyqrOc1XGPE8MbiHFSvb7Vlb4cNpZUlK8eS0uZRTfw31S9nh3ht4SpGVnFWWjkpNPkrRk7qq1acpNxVm4pqLcmuZ+m/t0f8ABI/WfC1vrHx9/Yu0GfxJ4l0Hw1qOp6n+zh4h1LVr5fF4/suTSVHw/wBW1kvt1zxCq7ToXiUqrPjbtLKg+BxsnUo33b+X2oW38ra9eh+lOPs4JLz/AD9Wfm9Jo/8AwVVm1ibUv+HXnxN/f69/ah/0vS+P+JrrGr/Xr4r1fHv+NIxP2u/4Is6P+1Bbn9oLUf2oP2ZPFH7Nuqf8Wht/Bg8SYY+MNOTwIF1vaD38N65pmxj0Xfg9cEA/fCgAoAKAK4OeRQbSje7S1/r5bEbfL0OM9vp9aDinBafgtdNvM/mU/wCCv/wY8VfCn43fCb9sf4dtJpU9xr2n6Fruo2nBsfH2jBB8PNU1bPL6J4j0Zv8AhH/FhAAUaOikZ6/0B4TYiHEVXMOEazjJ0VhXCKfK7SWPzCo4pewlKMZ0oe99YaXNBacyhP8Ai7x0yH/V7jLKPECgnF1Pr6nL4lzRyrKsmjbmq1kvdrNW+p3bUnd6VI/afwi8b+Ff2mvhn4b+IXgn7DpWsXOg/wBqL4b+1fbsYxo+saWfXW/Dv/IA56V+e18DHE0syyOS/gvBJyu7R9o1jLtKcUl7lr+2dm1t8J/QFbimfFGbZTiE9Kn1++2vLhlBf8w+Htb6v0iv1diaKaGWeCWLyZrb/j6tsdcn/A9P8a/P6nvKV1vbT5o/YDn7qwM4JhPPfp36ewwM/wCcV41akpdPRXeu3npYD45/aP8A2Xj8ZDfT+HNYg8Aa94w/4Q7wb8Wrm28L/wCn/FX4P6R/a+fhf/wsLP8AxJP+Ej/tb/irPEB/4Sb/AIpX+3/CX/FLj/iqaMFK+nffy+MD5W+G3/BPubwp4x1LxX4O8N/Dn4E3mofGTxfc6r/wiXhfSr6w+JHwP1f+x/8AhYvwv1bSdF/5gmdI/t/wn0/4RXxTo2T/AMJR4P8A+Eo8LeKe2tPz9709PK2wH6jeDvBOjeC/DWjeD/C+j6V4W8K6Ba/2DoGiaJa/YLC008deuRwP16Zrno0lKSXX89H5mabqu6/Tt8uxj3Hwb+HwuNMnOgf8S7R7XUdKu/Df2r/ig/En9r/2Pj+1vh6P+JBrXGlf8zFj/hKv+Zw/4Sevbo4RNNtfi+7/ALx2QpSht92nn3b7nvvhHwTpGmeGoNT1/TP7L8EeHrX+y7W3HAvf+gPpftjPXv8AStYYT+08fCl35rP/ALguX81P/n33/wCD89muZf2VmVTBp6Ll0/7gU6u/s6j3qX+L/Jfi3/wUA8SeKf26P2hfgb/wTX+GFxe203xk8U/2/wDGO60X7vgP4A6T/wATj4tamSQUz/YedA8Jh9qt4n1fQhknAP7nGnT4Wy6NSNo35uZuVkl7dx3nOta/1jlTW0pL1j+H4Bz4s4xngJySp0XTkuZJxU3lksRCN+Sim3LCuo4zqKMoQnG92oT/AK4fCPhbw74P8N6N4Q8O6ZBpfhvwvpmm6FoOi2x+Wy07SONKAGQRkDI7A4POTX87Y+M6uKXM73vfRf8APuHptax/Qycafw6NdNX+d+jZ2KwwruzjjHORXVi3y0OyW3znG/qN/vLNu2/+Xl2L+we/6f4VRiPoAKACgAoAKACgD5r+N/wa8FfHf4YeKPhZ48sBfeHPF+ltoV2SP+PMMc/2kACBkYA3EHgHB+Y46sqzuXD+c051FaK5n0k3bB1U7Wp1GnJ17K7tFu8tI6fnvE/BmW8Z5VXwHEdvrUPZezf7/d4jD1Zv/YcThadnTw1HSU/T3lJS/lO8Mav8Wv8AgnD+0Xqvw5+IH2i98MXFz9qee3tR9i1PwiVGkaP8TfAIBYBwpXQPFvh8EjBHhQEj/hFq/supkOR+KWQ0f3q9paXPTksRz0pyr06qpVfZYnBxhNQwcHJJysmpLmi06n8HZBx7xd4d8XVuFeKqKXCMeT2VdVMuaaeXYjHzahgMDi8zaeZ4vDxTeI630oqrSp/u94U+I/w3+MXhvTdXvpoBNcWv/Eg8WeG7r/QL7Tzj2OOfXr2xX8pcQYPiTBa4nD8sev73AP8A58/8+5Te84/1e39uZBxJk+aSS4TxH9o4B35/3WKwl7Kty/8AIyoU638anidv5NfclTva1H4S69FELjQZ4Nb00nhba6+w3/Bx1/z6V5WVVMPVf+2e5Pr8crfxP+fSS2Ufv9T7qpKnSinw9/sOYu/tPixPVcv+/XofwHX+H+fX34wOJfwvr+nZ+36DqsHTP+jD/P0wfyryXRorVv8A9K/zPajjcdU+z6a0f/kF2I4tC8Q8GLQdVYc8f2DqY/EdKP3EbXl8rT/QJY3HU/s+utH/AOQfc6rSvhr4w1Qj/iTjSbM5xc63d/YcY7Z75/Qd67KlPO8vt9ad49XbCLt0pub3nH+r2xhUyPFq+G0l0/3zTV3/AIiitoy3/wAjq/7C+Hvw8H9peJJv7c1I4+yWn2XpqHrnv/ketergYZbmMf8Aa43kv72IW7n/AM+nBbQj/V7+PjMfmOX3WDnZdPdof3X/AMvYTe85f1a35W/8FAf+ChmkfBbw3CJYp/FXxH1+6Gg/CX4X+HLQ+KvFviTxfq5GjaTpml6TomTrOsjIzxz264P6lw5whh8ow8sxzF+zxMbcsffne869B60MVUp/w6kHrDr3UpL8Yz/inFZviVl2XLnw0/4k/cioKMKFaLarYaFS3tITWk/vTjF/X3/BI7/gnx42/ZY8L+Nf2lv2lpG8Rftn/tPNpuqfE4G7F9YfCHwDhdX0f4F6Rqqk5Hh1j/bvizXnAPinxUoPzbEdvz/ijiCfFeIeCxjSw1J/u2le85wo1Ev3VLDzac6ChZycbyc1aPuv9J4YyGlwrho43B3nVldunK65ZQnXpSn+9q4inzSjWclaHNGMY03KbUZL9zoO/wCP9K+PPvyxQAUAFABQAUAFABQAUAciYoWWFSclc54Ixk8c5/rx+tcuY4WOcQjVobwu09dbuEWrTlTX/LprbXy6+bRjRrUo5XmbtmqvupO75/rG2HthlbDKF/3ln/18uj5f/ai/ZQ+Ev7VHgiXwH8S9I+0G3uRqfhnxJpv/ACNXhHUjj/ibaRnpjGBzyDyCcGvqeD+JM64em4UqyjDW8JRwtpXWIlF3lQr8kl7W17PmTt2cfgvEHw/yjjzLVw7jqKjiU2oVfa4iT/3jB45rkoY3B0/gwkI613rqve5oT/mj+Inwf/a5/wCCb2v6xqXlf8Jj8DrrUxeL4rtrXVL7wJeDP/MWwSPgxrWeMjI44Piiv6uwvH3DXiPCOHpYd0K9WDn7CpWxbqpU5Jzulh8LB+zeEUZyhUlFOcVzXcVP+N8Z4ccY+B1T2/hViP7RyuLaqP2OWYNXcYwiv+MkxubYi/1jNsx0Ub+5r7kqDp/Wnwm/4KM/DjU2ih8SazqvgDXz/wAuviTH9nnA/wCgvoucY6j1r8x4t8FsTOft8E7Rn0tTfwrDQ/5e5qnup9F+TP3TgDxvyvP6caHF/wDsOZxv7T/eMTvLGzj/AMivKaOH/wB3o4b4X9vX341E/vDw5+0no+u2huNL13StdhOMXVtdaXfcAf8AQW9u2cc18XW8P6sevorR02/6jdbn6nlni3gKt9O3Wtp/E/6lq7HTS/HiHbmPU+mefsnrx0/z+BrxK3AteLbT7dIa6L/qM0sGZ+LeApW079a2v8P/AKlr7nzd8Sf2zfBHhaG8h8R/ELQ4JT10b7V9uv8Ag4/5BGjev/1+lfXZV4Y8U4mXPm2tNbr/AITl0qJf7tmEZfFGn0/DmPieIfGHhij7mUrlqPZ3zB7ewb/3nLHH4XU6/jyn5R+LP2+/i1+0r45m+Cv7AXwY8ZftB/FSHGma9rWmg/8ACJ+BgeP7V+IHxCOPhD8McckcjxQ2MDwnmvtIUODuF4cmZQUqiupLnzRWerV3h3iV8OIp7Xa7fFy+NlEeMeMZKeAqOnSkouN6eVtyi3Ug3BYn6pd3wtVrmcYys0pX5eb9X/8Agnx/wSG0X9nDxbY/tWftV+L9M/aC/bKuLa/az8SG1z8N/gVY6rtfW9L+EulasFdtZbbnxT8W/EgPirxSNwx4aBJb8p4t4vxHFVaWLwb9lh9lG0Jc9vq9OylVpUZ35sO/d9nGc7SupQSS/YOFuD8LwrQjgsbFzrtKUXLnjK7VapUbdGtWi4uNeDhGUmqadotzlOT/AHMi2lJx9p6bcfKenTnPX8PevzrEYynmMZ4TCO2IfKtIvR3VVaVIQg7whL7X42R9jRwLyebxWJlzUFZ2ty9HT3hOrPWVSP2e3TVdFXSdwUAFABQAUAFABQAUAFABQBB5I9vzNAGTd2sGoWwhuz+4mPPXBz07/wCeCaqlKOVyVSl8Udnrre6fxc/So91/wPJdKea03TqLlXqnaz5toum3/DXX/g/lL8YP+CRv7Ivxc/tLUtO8Jar8FvEWsf6Tda18FdTPglrLUABjUx4ALeJPhH/beM58QN4YZyT145+5yfxpzfIYKjh5xdKKslVjSqT+21apLL5SaXtG5Or7ScpNydS1lH8n4n8C8tz6pKrVk+aTVrKvFP3aKa5Vm1Fc37laJKyVuW7u/hvxJ/wQIliv5bz4c/tb67YWfJth8Sfg54Y8Va9+Or/DDXfgiufYeG/avoF4m4jlTcJOWicV7G9/T6q1bt7z7XucH/EDuDf5l92a/wDz1v8Agc5/w4X+L+vfufFH7c+lwaP/ANS5+zrqn2/7B6f8XO+OnxKx16/nSfibiUnalNvluk3QSb6K/wBUf3pPTXUP+IHcG9ZJfLNtu6/4VtT6B+HP/BAX9jrRzHN8bfHnx7/agg+0rcnw38R/HWm+Cfhr0HP/AAr74MaH8NdB1jRjwSPEf/CTckgLt4ryMz8Ys4zVezc6cItbzp0ZyUm07p08Fh4uK9nFK8Xa15N3Po+GvBXLMimqlN/ZSaVPEN3UKyetTNcTKM5OrzNLlb5mlGMLRj+x/wALPg38K/gl4F0r4cfCH4ceCfhp4E0AY0vwh4A8MaX4U8J2XXG3SNGwoPfO3nA3ZAFfB4yusxk6lWUpN2u5We3KlpThSgvgW0Vfrfr+rKUsrpxp018PMlL4XaUlJ6S9o18b/NWPZ/JHt+ZrA0J6ACgAoAKACgAoAKACgAoAKACgAoAqbScbj68f/XFcWEpuetX3u2yv8X8rVrWRbcYK1PX71/6VfuyvIGA/1wweD9B+uee1dlWOCpq9SFrf3qr7fyt90cU6WYVf4c9O3LRdtu7TezKfkS+p/Mf/ABVb6f3v/JxfVMm/mf8A5d//ACYeRL6n8x/8VRp/e/8AJw+qZN/M/wDy7/8Aky5GtwVwZfwwDgZ/Mfh1qPb4ObtC/n/FXpul2M4LH0rc7utelBd+13u0XOMehH6/4Y/WuWrhHL4Hy220vfbvL1OuFaM7Ko+/fz/lS7Inrc0CgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/2Q==',
  measure_datetime: '2024-08-28 14:30:00',
  measure_type: MeasureEnumType.WATER,
  customer_code: '123',
};

const dataToUseCase: InputUploadMeasureUseCase = {
  imageBase64: data.image,
  dateTime: new Date(data.measure_datetime),
  type: data.measure_type,
  customerCode: data.customer_code,
};

const makeMeasureUsecase = () => {
  class MeasureUsecase implements UploadMeasureUseCaseContractDomain {
    async perform(data: any): Promise<Either<CustomError, any>> {
      return right({
        imageUrl: 'url',
        measureValue: 10,
        measureUuid: '123',
      });
    }
  }
  return new MeasureUsecase();
};

const makeSut = () => {
  const usecase = makeMeasureUsecase();
  const validator = new MeasureUploadValidator();
  const ValidatorImage = new SharpImagesConverter();
  const sut = new MeasureUploadController(validator, usecase, ValidatorImage);

  return { sut, validator, usecase, ValidatorImage };
};

describe('MeasureUploadController Unit Tests', () => {
  it('Should return error if received body without imageBase64', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, image: undefined } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo imagem base64 é obrigatório',
      },
    });
  });

  it('Should return error if received invalid image base64', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, image: 'invalid' } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'Imagem base64 inválida',
      },
    });
  });

  it('Should return error if received body without date time', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, measure_datetime: undefined } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo data é obrigatório',
      },
    });
  });

  it('Should return error if received invalid date time', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, measure_datetime: 'invalid' } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo data esta inválido',
      },
    });
  });

  it('Should return error if received body without type', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, measure_type: undefined } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
      },
    });
  });

  it('Should return error if received body without customer code', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: { ...data, customer_code: undefined } });

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo código do cliente é obrigatório',
      },
    });
  });

  it('Should return more than one error', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: {} });

    expect(response).toEqual({
      body: {
        error_code: 'INVALID_DATA',
        error_description:
          'O campo imagem base64 é obrigatório, O campo data é obrigatório, O campo tipo deve ter um dos seguintes valores: WATER, GAS, O campo código do cliente é obrigatório',
      },

      statusCode: 400,
    });
  });

  it('Should call UploadMeasureUseCase with correct values', async () => {
    const { sut, usecase } = makeSut();

    jest.spyOn(usecase, 'perform');

    await sut.handle({ body: data });
    expect(usecase.perform).toHaveBeenCalledWith({
      ...dataToUseCase,
    });
    expect(usecase.perform).toHaveBeenCalledTimes(1);
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ body: data });

    expect(response).toEqual({
      statusCode: 200,
      body: {
        image_url: 'url',
        measure_value: 10,
        measure_uuid: '123',
      },
    });
  });
});
