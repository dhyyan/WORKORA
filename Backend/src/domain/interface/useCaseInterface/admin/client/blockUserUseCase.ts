import { BlockUserInputDtos, BlockUserOutputDtos } from "../../../DTOs/admin/client/clientDtos";

export interface IBlockUserUSeCase{
    block(input:BlockUserInputDtos):Promise<BlockUserOutputDtos>
}